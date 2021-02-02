import { WebPartContext } from "@microsoft/sp-webpart-base";
import {SPHttpClient, ISPHttpClientOptions} from "@microsoft/sp-http";

export const getListItems = async (context: WebPartContext, listName: string) =>{
    const   restUrl = `${context.pageContext.web.absoluteUrl}/_api/web/lists/getByTitle('${listName}')/items?$orderby=Title`,

            _data = await context.spHttpClient.get(restUrl, SPHttpClient.configurations.v1);
    let listItems : {}[] = [];
    
    if(_data.ok){
        const result = await _data.json();
        result.value.map((item:any)=>{
            listItems.push({
                ID: item.Id,
                Title: item.Title,
                Status: item.Status
            });
        });
    }else{
        console.log("REST Call Error");
    }

    return listItems;
};