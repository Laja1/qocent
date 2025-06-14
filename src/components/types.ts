export interface TableColumn {
    label: string;
    key: string;
    formatter?: (value: any) => any;
    rowFormatter?: (data: any) => void;
    className?: string;
    sortFn?: (data: any) => void;
  }
  
  export interface TableProps {
    columns: TableColumn[];
    data: any;
    loading?: boolean;
    emptyDataMsg?: string;
    actionsHeader?: string;
    isFetching?: boolean;
    onRowClick?: (row: any) => void;
    actions?: (row: any) => React.ReactNode;
  }
  
  export interface Ipagination {
    totalItemsCount: number;
    itemsPerPage: number;
    dataLength: number;
    handlePageClick: (val: number) => void;
    handlePageCountChange: (val: number) => void;
  }