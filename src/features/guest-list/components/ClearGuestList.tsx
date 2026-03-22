'use client';

import { clearGuestList } from '@/actions/guest.action';
import {
  Button,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function ClearGuestList() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isClearing, setIsClearing] = useState(false);

  const handleClear = async () => {
    try {
      setIsClearing(true);
      const result = await clearGuestList();
      if (result?.message) {
        toast.error(result.message);
        return;
      }
      toast.success('Guest list cleared successfully');
      setIsOpen(false);
      router.refresh();
    } catch (error) {
      console.error('handleClear', error);
      toast.error('Failed to clear guest list');
    } finally {
      setIsClearing(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className='flex h-10 items-center rounded-lg bg-red-600 px-4 text-sm font-medium text-white transition-colors hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 cursor-pointer'
      >
        <span className='hidden md:block'>Clear</span>{' '}
        <TrashIcon className='h-5 md:ml-4' />
      </Button>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogBackdrop className='fixed inset-0 bg-black/30' />
        <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4'>
            <DialogPanel
              transition
              className='w-full max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0'
            >
              <DialogTitle as='h3' className='text-base/7 font-medium'>
                Clear guest list
              </DialogTitle>
              <p className='mt-2 text-sm/6'>
                Are you sure you want to delete all guests? This action cannot
                be undone.
              </p>
              <div className='mt-4 flex justify-end'>
                <Button
                  className='inline-flex items-center gap-2 rounded-md bg-red-600 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-red-500 data-[focus]:outline-1 data-[focus]:outline-white mr-2 cursor-pointer disabled:opacity-50'
                  onClick={handleClear}
                  disabled={isClearing}
                >
                  {isClearing ? 'Clearing...' : 'Clear All'}
                </Button>
                <Button
                  className='inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white cursor-pointer'
                  onClick={() => setIsOpen(false)}
                  disabled={isClearing}
                >
                  Cancel
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
