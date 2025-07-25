/* eslint-disable @typescript-eslint/no-explicit-any */


import * as React from "react"
import {
    Drawer,
    DrawerContent,
    // DrawerDescription,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer"
import NiceModal, {useModal} from "@ebay/nice-modal-react";
import { ModalConstant } from "./modal/register";

export const DrawerModal = NiceModal.create(() => {
    const modal = useModal(ModalConstant.DrawerModal);
    const details = modal.args;

    const formatKey = (key: string): string => {
        return key
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            .replace(/_/g, ' ')
            .replace(/\b\w/g, c => c.toUpperCase())
            .replace(/\bId\b/g, 'ID')
            .replace(/\bIP\b/g, 'IP')
            .replace(/\bUrl\b/g, 'URL');
    };


    const renderObjectAsTable = (obj: any, prefix = '') => {
        if (!obj || typeof obj !== 'object') {
            return [
                <tr key={prefix || 'value'}>
                    <td className="px-3 py-2 font-medium text-gray-700 border-b text-xs">Value</td>
                    <td className="px-3 py-2 text-gray-900 border-b break-words text-xs">{String(obj)}</td>
                </tr>
            ];
        }

        const rows: React.ReactElement[] = [];

        Object.entries(obj).forEach(([key, value]) => {
            const fullKey = prefix ? `${prefix}.${key}` : key;
            if (value === null || value === undefined) {
                rows.push(
                    <tr key={fullKey}>
                        <td className="px-3 py-2 font-medium text-gray-700 border-b text-xs">{formatKey(fullKey)}</td>
                        <td className="px-3 py-2 text-gray-400 italic border-b text-xs">
                            {value === null ? 'null' : 'undefined'}
                        </td>
                    </tr>
                );
            } else if (typeof value === 'object' && !Array.isArray(value)) {
                // For nested objects, add a header row and then recurse
                rows.push(
                    <tr key={`${fullKey}-header`}>
                        <td className="px-3 py-2 font-semibold text-gray-800 bg-gray-100 border-b text-xs" colSpan={2}>
                            {formatKey(fullKey)} (Object)
                        </td>
                    </tr>
                );
                rows.push(...renderObjectAsTable(value, fullKey));
            } else if (Array.isArray(value)) {
                rows.push(
                    <tr key={fullKey}>
                        <td className="px-3 py-2 font-medium text-gray-700 border-b text-xs">{formatKey(fullKey)}</td>
                        <td className="px-3 py-2 border-b text-xs">
                            <div className="space-y-1">
                                <span className="text-purple-600 font-medium text-xs">Array ({value.length} items)</span>
                                {value.length > 0 && (
                                    <div className="bg-gray-50 p-2 rounded text-xs max-h-32 overflow-y-auto">
                                        {value.map((item, index) => (
                                            <div key={index} className="py-1">
                                                <span className="text-gray-500">[{index}]:</span>{' '}
                                                <span className="break-words">
                                                    {typeof item === 'object' ? JSON.stringify(item) : String(item)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </td>
                    </tr>
                );
            } else {
                rows.push(
                    <tr key={fullKey}>
                        <td className="px-3 py-2 font-medium text-xs text-gray-700 border-b">{formatKey(fullKey)}</td>
                        <td className="px-3 py-2 border-b text-xs">
                            <span className={`break-words ${
                                typeof value === 'boolean'
                                    ? value ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'
                                    : typeof value === 'number'
                                        ? 'text-blue-600 font-mono'
                                        : 'text-gray-900'
                            }`}>
                                {String(value)}
                            </span>
                            {typeof value !== 'string' && (
                                <span className="ml-2 text-xs text-gray-400">
                                    ({typeof value})
                                </span>
                            )}
                        </td>
                    </tr>
                );
            }
        });

        return rows;
    };


    const getTitle = (): string => {
        if (!details) return "Details";
        if (details.title) return String(details.title);
        if (details.name) return String(details.name);
        if (details.id) return `Details - ID: ${details.id}`;
        return "Details";
    };

    // const getDescription = () => {
    //     if (!details) return "No data available";
    //     const keys = Object.keys(details);
    //     return `Viewing object with ${keys.length} properties`;
    // };

    return (
        <Drawer
            open={modal.visible}
            onOpenChange={(open) => {
                if (!open) modal.hide();
            }}
        >
            <DrawerContent>
                <div className="mx-auto w-full max-w-4xl max-h-[80vh] overflow-hidden">
                    <DrawerHeader className="pb-4">
                        <DrawerTitle>{getTitle()}</DrawerTitle>
                        {/* <DrawerDescription>{getDescription()}</DrawerDescription> */}
                    </DrawerHeader>

                    <div className="px-4 pb-6 overflow-y-auto max-h-[60vh]">
                        {details ? (
                            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                <table className="w-full">
                                    <thead>
                                    <tr className="bg-gray-50">
                                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                            Property
                                        </th>
                                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                            Value
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {renderObjectAsTable(details)}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                No data to display
                            </div>
                        )}
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
});