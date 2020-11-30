import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPHttpClient, SPHttpClientResponse, ISPHttpClientOptions, HttpClientResponse, HttpClient, IHttpClientOptions} from "@microsoft/sp-http";

export class CRUD{

    getAllLists = (context: WebPartContext) : Promise <[]> =>{
        let restUrl = context.pageContext.web.absoluteUrl + "/_api/web/lists?select=Title",
            listTitles : any = [];

        return new Promise <[]> (async(resolve, reject)=>{
            context.spHttpClient
                .get(restUrl, SPHttpClient.configurations.v1)
                .then((response: SPHttpClientResponse)=>{
                    response.json().then((results: any)=>{
                        results.value.map((result :any)=>{
                            listTitles.push(result.Title);
                        })
                    })
                    resolve(listTitles);
                }, (error:any)=>{
                    reject("Error Occured: " + error);
                })
        })
    }
    
    getListItems = () =>{

    }

    getExtListItems = () =>{

    }

    createListItem = () =>{

    }

    deleteListItem = () =>{
        
    }

    updateListItem = () =>{
        
    }


}