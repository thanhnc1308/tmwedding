import {
  PencilIcon,
  TrashIcon,
  CheckIcon,
  ClockIcon,
  MinusIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { DialogRouterIdentifier } from '@/types/dialog-router-identifier';
import clsx from 'clsx';
import { GuestConfirmationStatus } from '@/types/guest';

export function Status({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-gray-100 text-gray-500':
            status === GuestConfirmationStatus.Pending,
          'bg-green-500 text-white':
            status === GuestConfirmationStatus.Accepted,
          'bg-red-500 text-white': status === GuestConfirmationStatus.Declined,
        },
      )}
    >
      {status === GuestConfirmationStatus.Pending ? (
        <>
          Pending
          <ClockIcon className='ml-1 w-4 text-gray-500' />
        </>
      ) : null}
      {status === GuestConfirmationStatus.Accepted ? (
        <>
          Accepted
          <CheckIcon className='ml-1 w-4 text-white' />
        </>
      ) : null}
      {status === GuestConfirmationStatus.Declined ? (
        <>
          Declined
          <MinusIcon className='ml-1 w-4 text-white' />
        </>
      ) : null}
    </span>
  );
}

export function UpdateAction({ id }: { id: string }) {
  return (
    <Link
      id={id}
      href={`/admin/guest-list/edit/${id}`}
      className='rounded-md border p-2 hover:bg-gray-100'
    >
      <PencilIcon className='w-5' />
    </Link>
  );
}

export function DeleteAction({ id }: { id: string }) {
  return (
    <>
      <Link
        id={id}
        href={`/admin/guest-list?routerIdentifier=${DialogRouterIdentifier.DeleteGuest}&id=${id}`}
        className='rounded-md border p-2 hover:bg-gray-100'
      >
        <span className='sr-only'>Delete</span>
        <TrashIcon className='w-5' />
      </Link>
    </>
  );
}

export function ViewInvitationAction({ id }: { id: string }) {
  return (
    <a
      href={`/invitation/${id}`}
      target='_blank'
      rel='noopener noreferrer'
      className='rounded-md border p-2 hover:bg-gray-100'
    >
      <span className='sr-only'>View Invitation</span>
      <EyeIcon className='w-5' />
    </a>
  );
}
