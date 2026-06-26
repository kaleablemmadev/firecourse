import { useState, useRef, useEffect } from 'react';

interface Option {
  value: string;
  label: string;
}

export function useDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState<Option | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggle = () => setIsOpen(!isOpen);
    const close = () => setIsOpen(false);
    const select = (option: Option) => {
        setSelected(option);
        close();
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                close();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return { isOpen, selected, toggle, close, select, dropdownRef };
}