<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://kwa.digital/wp-content/uploads/2021/07/flat-device-mockups-yunohost.png" width="200" alt="Nest Logo" /></a>
</p>

# Documentation Technique

## Projet YunoHost - Groupe 2

## Sommaire

- [I - Architecture du projet](#i---architecture-du-projet)
  - [A - Back-End](#a---back-end)
  - [B - Front-End](#b---front-end)
- [II - Fonctionnalités](#ii---fonctionnalités)
- [III - Documentation des fonctionnalités](#iii---documentation-des-fonctionnalités)
  - [A - Interface d'application](#a---interface-dapplication)
  - [B - Bundles](#b---bundles)
  - [C - Applications](#c---applications)
- [IV - Installation](#iv---installation)
- [V - Lancement de l'application](#v---lancement-de-lapplication)
- [VI - Liens utiles](#vi---liens-utiles)

## Technologies utilisées

**Outils Open Source**

- Front-End : **ReactJS** <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" width="30px" />
- Back-End : **NestJS** <img src="https://upload.wikimedia.org/wikipedia/commons/a/a8/NestJS.svg" width="30px" />
- Base de données : **JSON** <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/JSON_vector_logo.svg/1024px-JSON_vector_logo.svg.png" width="30px" />
- Présentation : **Marp** <img src="https://avatars.githubusercontent.com/u/20685754?s=280&v=4" width="30px" />
- Distribution : **YunoHost** <img src="https://upload.wikimedia.org/wikipedia/commons/1/1e/YunoHost_logo.png" width="30px" />

## I - Architecture du projet

### A - Back-End

```
data/bundles.json
dist
src/
src/bundle
src/bundle/dto
src/domain
src/install
src/types
src/user
src/app.controller.spec.ts
src/app.controller.ts
src/app.module.ts
src/app.service.ts
src/main.ts
test/
.eslintrc.js
.gitignore
.prettierrc
docker-compose.yml
DocTechnique.md
lefthook.yml
nest-cli.json
package.json
pnpm-lock.yaml
Presentation.md
README.md
tsconfig.build.json
tsconfig.json
```

### B - Front-End

```
public
src
src/api
src/api/app.ts
src/assets/bundle.ts
src/components
src/components/layout
src/components/ui
src/components/bundle-list.tsx
src/components/create-form.tsx
src/components/form-install.tsx
src/components/site-footer.tsx
src/components/site-header.tsx
src/lib
src/lib/api.ts
src/lib/reactQuery.ts
src/lib/utils.ts
src/pages
src/pages/bundle.tsx
src/pages/create-bundle.tsx
src/pages/error.tsx
src/pages/home.tsx
src/types
src/types/interface.ts
src/App.tsx
src/Router.tsx
src/index.css
src/main.tsx
src/vite-env.d.ts
.eslintrc.cjs
.gitignore
.prettierignore
.prettierrc
README.md
components.json
index.html
lefthook.yml
package.json
pnpm-lock.yaml
postcss.config.js
tailwind.config.js
tsconfig.json
tsconfig.node.json
vite.config.ts
```

## II - Fonctionnalités

- Téléchargement simplifié de **Bundles** et d'**Applications** YunoHost
- Installation de **Bundles** YunoHost
- Installation d'**Applications** YunoHost

## III - Documentation des fonctionnalités

### A - Interface d'application

Nous avons opté pour un design épuré et pour une expérience utilisateur simplifiée.

Le dossier `src/components` contient les composants de l'application.

- `src/components/form-install.tsx`

Le composant _`FormInstall`_ est conçu pour gérer le processus d'installation de bundles d'applications.\
Il permet à l'utilisateur de **créer** et d'**installer** un ensemble d'applications regroupées sous forme de bundle. Il collecte des informations nécessaires, telles que le **domaine**, l'**administrateur**, le **mot de passe**, et les **applications à installer**.

```typescript
// imports

export default function FormInstall({ id }: { id: number }) {
    const { data: admins, isLoading: isLoadingAdmins } = useGetAdmins();
    const { data: bundle, isLoading: isLoadingBundle } = useGetOneBundle(id);
    const { data: allDomains, isLoading: isLoadingDomains } = useGetDomains();

    const [selectedApps, setSelectedApps] = React.useState<string[]>([]);

    const navigate = useNavigate();

    const handleSelectionChange = (selectedApp: string) => {
        setSelectedApps((prevSelectedApps) => {
            const updatedSelectedApps = prevSelectedApps.includes(selectedApp)
                ? prevSelectedApps.filter((app) => app !== selectedApp)
                : [...prevSelectedApps, selectedApp];

            form.setValue('apps', updatedSelectedApps);

            return updatedSelectedApps;
        });
    };

    const formSchema = z.object({
        domain: z.string(),
        user: z.string().min(1, "Le nom d'utilisateur est requis"),
        password: z.string().min(6, 'Le mot de passe doit avoir au moins 6 caractères'),
        apps: z.array(z.string()),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    async function onSubmit(data: z.infer<typeof formSchema>) {
        const appData = selectedApps.map((selectedApp) => {
            const app = bundle?.apps?.find((app) => app.app_name === selectedApp);
            return {
                appName: app?.app_name || selectedApp,
                domain: data.domain,
                path: '/' + selectedApp,
                admin: data.user,
                password: data.password,
            };
        });
        console.log(appData);

        try {
            await api.post(`${import.meta.env.VITE_API_URL}/api/install`, appData);
            const eventSource = new EventSource('https://dcm1tlg2.nohost.me/api/install/updates');

            eventSource.onmessage = (event) => {
                console.log("Mise à jour de l'installation:", event.data);

                // Vérifiez si le message contient 'Installation completed'
                if (event.data.includes('Installation completed')) {
                    eventSource.close(); // Fermez l'EventSource
                    navigate('/'); // Redirigez vers la page d'accueil
                }
            };
        } catch (error) {
            console.error('Erreur lors de la création du bundle :', error);
        }
    }

    etc...

    }

```

- `src/components/create-form.tsx`

Le composant _`BundleNew`_ a pour objectif de permettre à l'utilisateur de **créer un nouveau bundle** en fournissant des informations telles que le **nom du bundle**, la **description** et les **applications** incluses.

```typescript
// imports

export default function BundleNew() {
    const { data: apps } = useGetApps();

    const options = Object.keys(apps?.apps || {}).map((key) => ({
        value: apps?.apps[key]?.manifest?.id || key,
        label: apps?.apps[key]?.manifest?.name || key,
        description: apps?.apps[key]?.manifest?.description || '',
    }));

    const [selectedApps, setSelectedApps] = useState<string[]>([]);

    const navigate = useNavigate();

    const formSchema = z.object({
        title: z
            .string()
            .min(2, {
                message: "Le nom du bundle doit être d'au moins 2 caractères.",
            })
            .max(30, {
                message: 'Le nom du bundle ne peut pas dépasser 30 caractères.',
            }),
        description: z.string(),
        apps: z.array(
            z.object({
                appName: z.string(),
                description: z.string(),
            })
        ),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            description: '',
            apps: [],
        },
    });

    const handleSelectionChange = (selectedOptions: string[]) => {
        const updatedApps = selectedOptions.map((appValue) => ({
            appName: appValue,
            description: options.find((option) => option.value === appValue)?.description.fr || '',
        }));
        form.setValue('apps', updatedApps);
        console.log(updatedApps);
        setSelectedApps(selectedOptions);
    };

    async function onSubmit(data: z.infer<typeof formSchema>) {
        try {
            await api.post(`${import.meta.env.VITE_API_URL}/api/bundle/`, data);
            navigate('/');
        } catch (error) {
            console.error('Erreur lors de la création du bundle :', error);
        }
    }

    etc...

    }
```

- `src/components/bundle-list.tsx`

Le composant _`BundleList`_ a pour but d'**afficher une liste de bundles** disponibles dans l'application.

```typescript
// imports

export default function BundleList() {
    const { data: bundles, isLoading, error } = useGetBundles();

    if (isLoading) return <div>Loading bundles...</div>;
    if (error) return <div>Aucun Bundle trouvé</div>;
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {bundles &&
                bundles.map((bundle) => (
                    <Card key={bundle.id}>
                        <CardHeader>
                            <CardTitle>{bundle.title}</CardTitle>
                            <CardDescription>{bundle.description}</CardDescription>
                            <a href={`/bundle/${bundle.id}`} className={cn(buttonVariants({ variant: 'link' }), 'w-fit p-0')}>
                                Voir ce bundle
                            </a>
                        </CardHeader>
                    </Card>
                ))}
        </div>
    );
}
```

### B - Bundles

- `data/bundles.json`

Le fichier `bundles.json` contient tous les Bundles des applications **YunoHost**.

```json
{
    "id": 1,
    "title": "Bundle Association",
    "description": "description du bundle",
    "apps": [
      {
        "app_name": "yeswiki",
        "name": "YesWiki",
        "logo": "https://github.com/YunoHost/apps/blob/master/logos/yeswiki.png",
        "description": "Wiki facile et rapide à prendre en main",
        "screenshot": "https://github.com/YesWiki/yeswiki/blob/doryphore-dev/files/GererSite_modele_19880101000000_23001231235959.jpg"
      },
      {
        "app_name": "paheko",
        "name": "Paheko",
        "logo": "https://github.com/YunoHost/apps/blob/master/logos/paheko.png",
        "description": "Logiciel de gestion d'association",
        "screenshot": "https://github.com/YunoHost-Apps/paheko_ynh/blob/master/doc/screenshots/screenshot.png"
      },
      etc...
    ]
  }
```

- `src/bundle`

Le fichier `bundle.controller.ts` est un **contrôleur NestJS** responsable de la **gestion des requêtes** liées aux Bundles dans l'application YunoHost.\
Pour respecter une certaine architecture d'application le dossier `src/bundle` contient toutes les configurations de route des Bundles.

```typescript
import { Controller, Param } from '@nestjs/common';
import { BundleService } from './bundle.service';
import { Post, Body, Get } from '@nestjs/common';
import { BundleData } from 'src/types/interface';
import { CreateBundleDto } from './dto/create-bundle.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Bundle')
@Controller('bundle')
export class BundleController {
  constructor(private readonly bundleService: BundleService) {}

  // Créer un Bundle
  @Post()
  @ApiResponse({
    status: 200,
    description: "Création d'un bundle.",
  })
  async createBundle(@Body() bundleData: CreateBundleDto): Promise<void> {
    await this.bundleService.createBundle(bundleData);
  }

  etc...

}
```

### C - Applications

- `src/install`

Le fichier `install.controller.ts` est un **contrôleur NestJS** responsable de la **gestion des requêtes** liées à l'**installation d'applications** et à la **récupération d'informations sur les Bundles et les applications** dans l'application YunoHost.\
Pour respecter une certaine architecture d'application le dossier `src/install` contient toutes les configurations des routes des applications.

```typescript
import { Controller, Param } from '@nestjs/common';
import { Post, Body, Get, Res, HttpStatus } from '@nestjs/common';
import { InstallService } from './install.service';
import { ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';

@ApiTags('Install')
@Controller('install')
export class InstallController {
  constructor(private install: InstallService) {}

  // Installer une application
  @Post('')
  @ApiBody({
    description: "Les données de l'application à installer",
    type: [Object],
  })
  @ApiResponse({
    status: 200,
    description: "Installation d'une application.",
  })
  async installApps(@Body() appsData: any[], @Res() response) {
    try {
      const results = await this.install.installApps(appsData);
      response.status(HttpStatus.OK).json({ results });
    } catch (error) {
      response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  }

    // Récupérer tous les Bundles
  @Get('api/bundle')
  @ApiResponse({
    status: 200,
    description: 'Récupération de tous les Bundles.',
  })
  async getAllBundles(@Res() response) {
    try {
      const bundles = await this.install.getAllBundles();
      console.log({ message: 'Récupération des bundles effectuée !', bundles });
      response.status(HttpStatus.OK).json({ bundles });
    } catch (error) {
      console.log({
        message: 'Erreur lors de la récupération des bundles : ',
        error,
      });
      response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  }

  etc...

}
```

## IV - Installation

```bash
$ pnpm install
```

## V - Lancement de l'application

```bash
# Dévelopment
$ pnpm run start
ou
$ npm run start

# Watch Mode
$ pnpm run start:dev
ou
$ npm run start:dev

# Production Mode
$ pnpm run start:prod
ou
$ pnpm run start:prod
```

## VI - Liens utiles

- [Dépôt Back-End](https://github.com/axelverglas/bundle-app-frontend-yunohost)
- [Dépôt Front-End](https://github.com/axelverglas/bundle-app-backend-yunohost)
- [Présentation]()
- [Documentation YunoHost](https://yunohost.org/fr)

## Membres du Groupe

- Axel **VERGLAS**
- Lisa **AU**
- Dorine **HENRY**
- Pierre Arthur **TOUTOUOM YOUNTEBO**
- El Mehdi **BADOUH**
- Steven **YAMBOS**
