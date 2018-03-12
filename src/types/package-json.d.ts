export default interface PackageJson {
    "name"?: string,
    "dependencies"?: {
        [package: string]: string
    },
    "devDependencies"?: {
        [package: string]: string
    },
    "scripts"?: {
        [name: string]: string
    }
}
