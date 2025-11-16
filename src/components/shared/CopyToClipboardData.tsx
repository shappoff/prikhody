import React from "react";
import { ContentCopyIcon, DoneIcon } from "./icons";
import {copyToClipboard} from "@/components/utils";
import Tooltip from './Tooltip';
import Snackbar from './Snackbar';

// Props interface for the CopyToClipboardData component
interface CopyToClipboardDataProps {
  data: string;
  callback?: () => void;
  withSnackbar?: boolean;
}

const CopyToClipboardData: React.FC<CopyToClipboardDataProps> = ({data, callback, withSnackbar = false}): React.JSX.Element => {
    const [openSnackbar, setOpenSnackbar] = React.useState<boolean>(false);
    const [isCopied, setIsCopied] = React.useState<boolean>(false);

    return <React.Fragment>
        {
            isCopied ?
                <>
                    <DoneIcon fontSize="small" style={{fontSize: '15px'}}/>
                </> :
                <>
                    <Tooltip title="Скопировать шифр дела">
                        <ContentCopyIcon
                            onClick={() => {
                                copyToClipboard(data, () => {
                                    setIsCopied(true);
                                    withSnackbar && setOpenSnackbar(true);
                                    callback && callback()
                                });
                            }}
                            fontSize="small"
                            style={{
                                fontSize: '15px',
                                cursor: 'pointer'
                            }}
                        />
                    </Tooltip>
                </>
        }
        {
            withSnackbar ? <Snackbar
                open={openSnackbar}
                autoHideDuration={2000}
                onClose={() => {setOpenSnackbar(false)}}
                message="Скопировано"
            /> : <></>
        }

    </React.Fragment>
};

export default CopyToClipboardData;
