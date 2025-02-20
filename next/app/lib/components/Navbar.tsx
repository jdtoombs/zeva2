
"use client";

import React from 'react';
import { Routes } from '../constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User } from '@auth/core/types';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { keycloakSignOut } from '../actions/keycloak';
import { Role } from "@/prisma/generated/client";


export interface INavbarOption {
  label: string;
  route: string;
}

export interface INavbarProps {
  user: User;
}

/** Client Component used for navigation */
export const Navbar: React.FC<INavbarProps> = ({ user }) => {
  const pathname = usePathname();
  const [showUserDropDown, setShowUserDropDown] = React.useState(false);
  console.log(user);

  const navItems: INavbarOption[] = [
    { label: 'Home', route: Routes.Home },
    { label: 'Compliance Reporting', route: Routes.ComplianceReporting },
    { label: 'Credit Transactions', route: Routes.CreditTransactions },
    { label: 'ZEV Models', route: Routes.ZEVModels },
    { label: 'Vehicle Suppliers', route: Routes.VehicleSuppliers },
    { label: 'Administration', route: Routes.Administration }
  ];

  return (
    <div className="flex flex-row w-full bg-defaultBackgroundBlue border-t-2 border-primaryYellow mr-[16rem] px-1 z-0">
      {navItems.map(item => (
        <Link
          key={item.label}
          href={item.route}
          className={`cursor-pointer px-2 ${pathname === item.route ? 'border-b-2 border-primaryYellow' : ''}`}
        >
          {item.label}
        </Link>
      ))}
      <div className='ml-auto relative'>
        <div
          onClick={() => setShowUserDropDown(!showUserDropDown)}
          className='cursor-pointer flex flex-row items-center'
        >
          {user.name}
          {!showUserDropDown ? (
            <FaAngleDown className='mt-[0.5px] ml-1' />
          ) : (
            <FaAngleUp className='mt-[0.5px] ml-1' />
          )}
        </div>
        {showUserDropDown && (
          <div onClick={keycloakSignOut} className='absolute right-0 bg-defaultBackgroundBlue border mt-[0.5px] p-2 shadow-lg cursor-pointer'>
            Sign Out
          </div>
        )}
      </div>
    </div>
  );
};
