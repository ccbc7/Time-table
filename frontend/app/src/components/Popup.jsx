import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon } from "@heroicons/react/24/outline";
import {
  ArrowPathIcon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Notice from "@/components/Notice";

export default function ProductPopover() {
  return (
    <>
      <Popover className="relative">
        <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
          <BellIcon
            className=" border h-8 flex-none text-black-400 bg-green-300 mx-2 p-1 rounded-full hover:bg-lime-400"
            aria-hidden="true"
          />
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
          <Popover.Panel className="absolute right-4 top-full z-10 mt-3 w-60 overflow-hidden rounded-lg bg-gray-100 shadow-lg ring-1 ring-gray-900/5 px-2">
            <Notice />
          </Popover.Panel>
        </Transition>
      </Popover>
    </>
  );
}
