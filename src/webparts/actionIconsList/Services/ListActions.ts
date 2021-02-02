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

export const updateListItems = async(context: WebPartContext, listTitle:string, listItems: any, status: string) =>{
    for(let listItem of listItems){
        let restUrl = `${context.pageContext.web.absoluteUrl}/_api/web/lists/getByTitle('${listTitle}')/items(${listItem.ID})`;
        let body = JSON.stringify({Status: status});

        let spOptions: ISPHttpClientOptions = {
            headers:{
                Accept: "application/json;odata=nometadata", 
                "Content-Type": "application/json;odata=nometadata",
                "odata-version": "",
                "IF-MATCH": "*",
                "X-HTTP-Method": "MERGE",    
            },
            body: body
        };
        let _data = await context.spHttpClient.post(restUrl, SPHttpClient.configurations.v1, spOptions);
        
        if (_data.ok){
            console.log('Item is updated!');
        }
    }
};