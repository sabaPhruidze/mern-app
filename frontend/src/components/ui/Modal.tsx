import  { type ReactNode, useEffect } from "react";
import {createPortal} from 'react-dom'
import {FiX} from 'react-icons/fi'
type ModalProps = {
    open: boolean;
    title?:string;
    onClose:() => void;
    children:ReactNode;
}
const Modal = ({open,title,onClose,children}: ModalProps) => {
    useEffect(() => {
    if(!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
        document.body.style.overflow = prev;
    }
    },[open])
   if(!open) return null;
  return createPortal(
    <div className='fixed inset-0 z-50'>
        <div className='absolute inset-0 bg-black/40' onClick={onClose}/>
        <div className='absolute inset-0 flex items-center justify-center p-4'>
            <div className='w-full max-w-lg bg-white rounded-xl border border-gray-200 shadow-lg'>
                <div className='flex items-center justify-between px-4 py-3 border-b border-gray-100'>
                    <p className='text-sm'>{title || 'Modal'}</p>
                    <button onClick={onClose} className='p-2 rounded-lg border border-gray-200 text-gray-500 hover:text-red-600 hover:bg-gray-50 cursor-pointer'>
                        <FiX/>
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