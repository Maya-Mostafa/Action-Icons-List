import * as React from 'react';
import styles from './ActionIconsList.module.scss';
import { IActionIconsListProps } from './IActionIconsListProps';
// import { escape } from '@microsoft/sp-lodash-subset';

import {DetailsList} from '@fluentui/react';

import {CRUD} from '../Services/CRUD';

export default function ActionIconsList (props:IActionIconsListProps) {

    const crud = new CRUD();

    React.useEffect(()=>{
      console.log(crud.getAllLists(props.context));
    })

    return (
      <div></div>
    );
  
}
