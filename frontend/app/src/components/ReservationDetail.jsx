import React, { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";

export default function ReservationDetail({ reservation, onClose }) {
  return (
    <Popover className="relative">
      <Popover.Button>
        <a>{reservation.facility_user_name}</a>
      </Popover.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute right-0 top-full z-20 mt-3 w-60 rounded-lg shadow-lg ring-1 ring-gray-900/5 px-2 opacity-95 bg-green-400">
          <div>
            <p>予約ID: {reservation.id}</p>
            <p>
              予約者: {reservation.user.username}担当: {reservation.user.bio}
            </p>
            <p>使用者: {reservation.facility_user_name}</p>
            <p>目的: {reservation.purpose}</p>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
