import { RootState } from '../../redux/store';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTool } from '../../redux/action/tool';
import SidebarComponent from '../../utils/components/Snackbar';
import { Send } from '@mui/icons-material';

const Page = () => {
    /////////////////////////////////////////////////// VARIABLES //////////////////////////////////////////////////////
    const { queryResponses, isFetching }: { queryResponses: { inputs: { [key: string]: any }, response: string }[] | [], isFetching: boolean } = useSelector((state: RootState) => state.tool);
    const dispatch = useDispatch()
    const { toolId } = useParams();

    /////////////////////////////////////////////////// STATES //////////////////////////////////////////////////////
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
    const [snackbarText, setSnackbarText] = useState<string>('');

    /////////////////////////////////////////////////// USE EFFECTS //////////////////////////////////////////////////////
    useEffect(() => {
        dispatch<any>(getTool(toolId as string))
    }, [])

    /////////////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////////////////
    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                setOpenSnackbar(true);
                setSnackbarText('Text copied to clipboard');
            })
            .catch((error) => {
                console.error('Copy failed: ', error);
            });
    };

    /////////////////////////////////////////////////// COMPONENTS //////////////////////////////////////////////////////
    const QueryResponse = ({ queryResponse }: { queryResponse: { inputs: { [key: string]: any }, response: string } }) => {
        const [showCopyButton, setShowCopyButton] = useState(false)

        return (
            <div onMouseEnter={() => setShowCopyButton(true)} onMouseLeave={() => setShowCopyButton(false)}>
                <div className='flex flex-col gap-2'>
                    <div className='flex justify-between items-center'>
                        {Object.keys(queryResponse.inputs).map((key, i) => (
                            <div className='flex justify-start gap-2 text-[14px] capitalize' key={i}>
                                <span className='text-main-blue font-semibold'>{key} :</span>
                                <span className='text-gray-700 font-medium'>{Object.values(queryResponse.inputs)[i] as string}</span>
                            </div>
                        ))}
                        {showCopyButton && (
                            <button onClick={() => handleCopy(queryResponse.response)} className='text-red hover:underline font-medium text-[14px]'>
                                Copy
                            </button>
                        )}
                    </div>
                    <p className={`text-black text-[16px] capitalize`}>{queryResponse.response}</p>
                    <hr className='w-full h-[1px] bg-gray-400' />
                </div>
            </div>
        )
    }

    return (
        <div className="px-[1rem] py-[2rem] bg-white min-h-screen ">
            <SidebarComponent open={openSnackbar} setOpen={setOpenSnackbar} note={snackbarText} />

            <div style={{ height: 'calc(100vh - 4rem)' }} className="relative w-full min-h-full overflow-y-scroll flex flex-col gap-[1rem] p-[2rem] bg-lighter-gray rounded-[1rem] ">
                <div className='w-full h-full flex flex-col gap-4'>
                    {
                        queryResponses.length > 0 && !isFetching 
                            ?
                            <>
                                {
                                    queryResponses.map((queryResponse, index) => (
                                        <QueryResponse queryResponse={queryResponse} key={index} />
                                    ))
                                }
                            </>
                            :    
                            <div className="w-full h-full flex justify-center items-center text-main-blue font-medium text-2xl">
                                Query Something To Get Response From Our AI Bot
                            </div>
                    }
                    <>
                        {
                            isFetching &&
                            <div className='w-full h-full flex flex-col justify-center items-center gap-[8px]'>
                                Processing...
                                <Send style={{ fontSize: '40px' }} className='text-light-gray' />
                            </div>
                        }
                    </>
                </div>
            </div>
        </div>
    );
};

export default Page;
