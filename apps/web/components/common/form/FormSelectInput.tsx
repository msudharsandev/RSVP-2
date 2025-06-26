'use client';

import type React from 'react';
import { useState, useRef, useEffect, useCallback } from 'react';
import { Control, FieldPath, FieldValues } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { ChevronDown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

interface SelectOption {
  value: number;
  label: string;
  isOthers?: boolean;
}

interface FormSelectInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  control: Control<TFieldValues>;
  name: TName;
  label?: string;
  options: SelectOption[];
  placeholder?: string;
  defaultValue?: number;
  className?: string;
  ariaLabel?: string;
  allowCustomInput?: boolean;
  emptyMessage?: string;
  disabled?: boolean;
}

function FormSelectInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  options,
  placeholder,
  defaultValue,
  className,
  ariaLabel,
  allowCustomInput = true,
  emptyMessage = 'No options found',
  disabled = false,
}: FormSelectInputProps<TFieldValues, TName>) {
  const [open, setOpen] = useState(false);
  const [customInputMode, setCustomInputMode] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const inputRef = useRef<HTMLInputElement>(null);
  const isTypingRef = useRef(false);

  const updateFilteredOptions = useCallback(
    (inputValue: string) => {
      if (inputValue && customInputMode) {
        const filtered = options.filter(
          (option) =>
            option.isOthers ||
            option.label.toLowerCase().includes(inputValue.toLowerCase()) ||
            option.value.toString().includes(inputValue)
        );
        setFilteredOptions(filtered);
      } else {
        setFilteredOptions(options);
      }
    },
    [options, customInputMode]
  );

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        useEffect(() => {
          if (field.value === undefined && defaultValue !== undefined && !isTypingRef.current) {
            field.onChange(defaultValue);
            const selectedOption = options.find((opt) => opt.value === defaultValue);
            setCustomInputMode(!!selectedOption?.isOthers);
          }
        }, [field, defaultValue]);

        const displayValue = customInputMode
          ? field.value?.toString() || ''
          : options.find((opt) => opt.value === field.value)?.label ||
            field.value?.toString() ||
            '';

        useEffect(() => {
          const handler = setTimeout(() => {
            updateFilteredOptions(displayValue);
          }, 100);
          return () => clearTimeout(handler);
        }, [displayValue, updateFilteredOptions]);

        const handleInputChange = (newValue: string) => {
          isTypingRef.current = true;
          const parsed = Number(newValue);
          if (!isNaN(parsed)) {
            field.onChange(parsed);
          } else {
            field.onChange(undefined);
          }
          if (!open) {
            setOpen(true);
          }
          setTimeout(() => {
            isTypingRef.current = false;
          }, 100);
        };

        const handleInputFocus = () => {
          setOpen(true);
        };

        const handleInputBlur = () => {
          if (
            allowCustomInput &&
            customInputMode &&
            displayValue &&
            !options.some((opt) => opt.value === Number(displayValue))
          ) {
            setTimeout(() => setOpen(false), 150);
          }
          isTypingRef.current = false;
        };

        const handleSelectOption = (option: SelectOption) => {
          if (option.isOthers) {
            setCustomInputMode(true);
            field.onChange(0);
            inputRef.current?.focus();
          } else {
            setCustomInputMode(false);
            field.onChange(option.value);
            setOpen(false);
            inputRef.current?.blur();
          }
        };

        const handleAcceptCustomValue = () => {
          const parsed = Number(displayValue);
          if (!isNaN(parsed)) {
            field.onChange(parsed);
          }
          setOpen(false);
          inputRef.current?.blur();
        };

        const handleClear = () => {
          setCustomInputMode(false);
          field.onChange(undefined);
          inputRef.current?.focus();
        };

        const handleKeyDown = (e: React.KeyboardEvent) => {
          if (e.key === 'Enter') {
            if (allowCustomInput && customInputMode && displayValue) {
              handleAcceptCustomValue();
            } else if (!open) {
              setOpen(true);
            }
          } else if (e.key === 'Escape') {
            setOpen(false);
            inputRef.current?.blur();
          } else if (e.key === 'ArrowDown' && !open) {
            setOpen(true);
          }
        };

        const isCustomValue =
          allowCustomInput &&
          customInputMode &&
          displayValue &&
          !options.some((opt) => opt.value === Number(displayValue)) &&
          !isNaN(Number(displayValue));

        return (
          <FormItem className="w-full">
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <div className={cn('relative', className)}>
                    <Input
                      ref={inputRef}
                      type="text"
                      placeholder={placeholder}
                      value={displayValue}
                      onChange={(e) => handleInputChange(e.target.value)}
                      onKeyDown={handleKeyDown}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      className="pr-20"
                      aria-label={ariaLabel}
                      readOnly={!customInputMode}
                      disabled={disabled}
                    />
                    <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-1">
                      {displayValue && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 hover:bg-muted"
                          onClick={handleClear}
                          disabled={disabled}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      )}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 hover:bg-muted"
                        onClick={() => setOpen(!open)}
                        disabled={disabled}
                      >
                        <ChevronDown
                          className={cn('h-3 w-3 transition-transform', open && 'rotate-180')}
                        />
                      </Button>
                    </div>
                  </div>
                </PopoverTrigger>
                <PopoverContent
                  className="w-full min-w-[var(--radix-popover-trigger-width)] p-0"
                  align="start"
                  sideOffset={4}
                  onInteractOutside={(e) => {
                    if (inputRef.current?.contains(e.target as Node)) {
                      e.preventDefault();
                    }
                  }}
                >
                  <Command>
                    <CommandList>
                      {isCustomValue && (
                        <CommandGroup>
                          <CommandItem
                            value={`custom-${displayValue}`}
                            onSelect={handleAcceptCustomValue}
                            className="cursor-pointer bg-muted/50"
                          >
                            <div className="flex flex-col w-full">
                              <span className="font-medium">Use "{displayValue}"</span>
                              <span className="text-xs text-muted-foreground">
                                Press Enter or click to confirm
                              </span>
                            </div>
                          </CommandItem>
                        </CommandGroup>
                      )}
                      {filteredOptions.length > 0 && (
                        <CommandGroup>
                          {filteredOptions.map((option) => (
                            <CommandItem
                              key={option.value}
                              value={option.value.toString()}
                              onSelect={() => handleSelectOption(option)}
                              className="cursor-pointer"
                            >
                              <div className="flex flex-col">
                                <span>{option.label}</span>
                                {option.value.toString() !== option.label && !option.isOthers && (
                                  <span className="text-xs text-muted-foreground">
                                    {option.value}
                                  </span>
                                )}
                              </div>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      )}
                      {filteredOptions.length === 0 && !isCustomValue && (
                        <CommandEmpty>{emptyMessage}</CommandEmpty>
                      )}
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}

export default FormSelectInput;
