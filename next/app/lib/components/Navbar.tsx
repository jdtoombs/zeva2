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
  role: Role;
}

export interface INavbarProps {
  user: User;
}

/** Client Component used for navigation */
export const Navbar: React.FC<INavbarProps> = ({ user }) => {
  const pathname = usePathname();
  const [showUserDropDown, setShowUserDropDown] = React.useState(false);

  const navItems: INavbarOption[] = [
    { label: 'Home', route: Routes.Home, role: Role.ZEVA_USER },
    { label: 'Compliance Reporting', route: Routes.ComplianceReporting, role: Role.ZEVA_USER },
    { label: 'Credit Transactions', route: Routes.CreditTransactions, role: Role.ZEVA_USER },
    { label: 'ZEV Models', route: Routes.ZEVModels, role: Role.ZEVA_USER },
    { label: 'Vehicle Suppliers', route: Routes.VehicleSuppliers, role: Role.ZEVA_USER },
    { label: 'Administration', route: Routes.Administration, role: Role.ORGANIZATION_ADMINISTRATOR }
  ];

  return (
    <div className="flex flex-row w-full bg-defaultBackgroundBlue border-t-2 border-primaryYellow mr-[16rem] px-1 mb-1">
      {navItems.map((item) => {
        if (user.roles?.includes(item.role) || user.roles?.includes(Role.ADMINISTRATOR)) {
          return (
            <Link
              key={item.label}
              href={item.route}
              className={`cursor-pointer px-2 ${pathname === item.route ? 'border-b-2 border-primaryYellow' : ''}`}
            >
              {item.label}
            </Link>
          );
        }
        return null;
      })}

      <div className='ml-auto relative'>
        <div
          onClick={() => setShowUserDropDown(!showUserDropDown)}
          className='cursor-pointer flex flex-row items-center'
        >
          {user?.name || 'User'}
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

