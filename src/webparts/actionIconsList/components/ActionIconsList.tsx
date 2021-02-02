import * as React from 'react';
import styles from './ActionIconsList.module.scss';
import { IActionIconsListProps } from './IActionIconsListProps';
// import { escape } from '@microsoft/sp-lodash-subset';

import {DetailsList, Selection, MarqueeSelection, TextField, Announced, IColumn} from '@fluentui/react';
import {getListItems, updateListItems} from '../Services/ListActions';


export default function ActionIconsList (props:IActionIconsListProps) {

    const [listItems, setListItems] = React.useState([]);
    const [selectionDetails, setSelectionDetails] = React.useState('');
    const [selectedItems, setSelectedItems] = React.useState([]);

    const _selection: any = new Selection({
      onSelectionChanged: () => {
        setSelectionDetails(_getSelectionDetails);
        setSelectedItems(_selection.getSelection());
      }
    });
    const _getSelectionDetails = (): string => {
      const selectionCount = _selection.getSelectedCount();
      switch (selectionCount) {
        case 0:
          return 'No items selected';
        case 1:
          return '1 item selected: ' + _selection.getSelection()[0].Title + ' with ID: ' + _selection.getSelection()[0].ID;
        default:
          return `${selectionCount} items selected and they are ${JSON.stringify(_selection.getSelection())}`;
      }
    };

    const onFilter = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, text: string): void => {
      text ? setListItems(listItems.filter((i => i.Title.toLowerCase().indexOf(text) > -1))) : setListItems(listItems);
    };

    const listColumns: IColumn[] = [
      { key: 'column1', name: 'Title', fieldName: 'Title', minWidth: 100, maxWidth: 200, isResizable: true },
      { key: 'column2', name: 'Status', fieldName: 'Status', minWidth: 100, maxWidth: 200, isResizable: true },
    ];

    React.useEffect(()=>{
      getListItems(props.context, 'Requests').then((results)=>{
        setListItems(results);
      });
    }, [listItems.length]);

    const updateSelectedItems = (status: string) =>{
      return ()=>{
        updateListItems(props.context, 'Requests', selectedItems, status).then(()=>{
          getListItems(props.context, 'Requests').then((results)=>{
            setListItems(results);
          });
        });
      };
    };

    return (
      <div>

        <button onClick={updateSelectedItems('Final')}>Change State to 'Final'</button>&nbsp;
        <button onClick={updateSelectedItems('Deferred')}>Change State to 'Deferred'</button>&nbsp;
        <button onClick={updateSelectedItems('Completed')}>Change State to 'Completed'</button>

        <div>{selectionDetails}</div>
        {/* <TextField label="Filter by Title" onChange={onFilter} /> */}
        <MarqueeSelection selection={_selection}>
          <DetailsList 
            items = {listItems}
            columns = {listColumns}
            setKey="set"
            selection={_selection}
            selectionPreservedOnEmptyClick={true}
            ariaLabelForSelectionColumn="Toggle selection"
            ariaLabelForSelectAllCheckbox="Toggle selection for all items"
            checkButtonAriaLabel="Row checkbox"
          />
        </MarqueeSelection>
      </div>
    );
  
}
