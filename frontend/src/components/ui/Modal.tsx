import type { ReactNode } from "react";
import {createPortal} from 'react-dom'
type ModalProps = {
    open: boolean;
    title?:string;
    onClose:() => void;
    children:ReactNode;
}
const Modal = ({open,title,onClose,children}: ModalProps) => {
    if(!open) return null;
  return createPortal(
    <div className='fixe inset-0 z-50'>
        <div className='absolute insent-0 bg-black/40' onClick={onClose}/>
        <div className='absolute insent-0 flex items-center justify-center p-4'>
            <div className='w-full max-w-lg bg-white rounded-xl border border-gray-200 shadow-lg'>
                <div className='flex items-center justify-between px-4 py-3 border-b border-gray-100'>
                    <p className='text-sm underline'>{title || 'Modal'}</p>
                    <button onClick={onClose} className='text-sm underline'>
                        X
                    </button>
                </div>
                <div className='p-4'>{children}</div>
            </div>
        </div>
    </div>,
    document.body
  )
}

export default Modal