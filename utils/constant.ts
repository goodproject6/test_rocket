export const STARTING_SEARCH: string = "Starting search"
export const FINDING_BLOCKS: string = "Finding blocks"
export const  ERROR_OCCURED_MESSAGE:string = "ssss"
export const errorMsg = (lang: string) => {
    if (lang === "es") {
        return "Ocurrió un error desconocido"
    } else {
        return "An unknown error occurred"
    }

}