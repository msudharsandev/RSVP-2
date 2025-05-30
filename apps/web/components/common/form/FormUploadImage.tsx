'use client';

import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Progress } from '@/components/ui/progress';
import api from '@/lib/axios/instance';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { useCallback, useState } from 'react';
import { Control, FieldPath, FieldValues, useController, useFormContext } from 'react-hook-form';
import { Icons } from '../Icon';

function FormImageUpload<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  className,
  labelClassName,
}: {
  control: Control<TFieldValues>;
  name: TName;
  label?: string;
  className?: string;
  labelClassName?: string;
}) {
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const { setValue } = useFormContext<TFieldValues>();
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) handleSave(droppedFile);
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const removeImage = () => {
    setValue(
      name,
      {
        signedUrl: '',
        file: '',
        url: '',
      } as TFieldValues[TName],
      { shouldDirty: true, shouldTouch: true }
    );
  };

  const handleSave = async (file: File) => {
    setIsUploading(true);
    try {
      const { data } = await api.get('/event/upload-image', { params: { filename: file.name } });
      const signedUrl = data.data.signedUrl;
      const fileUrl = URL.createObjectURL(file);
      const url = signedUrl.split('?')[0];
      const type = file.type;

      if (fileUrl && url)
        setValue(
          name,
          { file: fileUrl, url: url, signedUrl: signedUrl, type } as TFieldValues[TName],
          {
            shouldDirty: true,
            shouldTouch: true,
          }
        );

      setUploadProgress(100);
    } catch (error) {
      console.error('Upload failed:', error);
      onChange(null);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem className={className}>
          {label && <FormLabel className={cn('text-white', labelClassName)}>{label}</FormLabel>}
          <FormControl>
            <div
              className="mt-4 space-y-4"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              {value.file && (
                <figure className="relative mx-auto mb-4 w-full max-w-3xl aspect-square">
                  <div className="relative w-full h-full overflow-hidden rounded-lg">
                    <div
                      className="absolute inset-0 bg-center bg-cover filter blur-xl scale-105"
                      style={{ backgroundImage: `url(${value.file})` }}
                    />
                    <img
                      src={value.file || value.url}
                      alt="Uploaded Image"
                      className="relative z-10 mx-auto h-full object-contain"
                    />
                  </div>
                  <Button
                    className="absolute -top-3 -right-3 z-20 bg-opacity-80 hover:bg-destructive hover:bg-opacity-100 hover:text-white"
                    onClick={removeImage}
                    variant="destructive"
                    size="icon"
                    radius="sm"
                  >
                    <X size={18} />
                  </Button>
                </figure>
              )}
              {!value.file && (
                <div className="relative flex flex-col items-center gap-4">
                  <input
                    className="sr-only"
                    type="file"
                    accept=".png, .jpg, .svg"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      if (file) handleSave(file);
                    }}
                    id={`file-upload-${name}`}
                  />
                  {!isUploading && (
                    <label
                      htmlFor={`file-upload-${name}`}
                      className="w-full cursor-pointer gap-2 rounded-xl border bg-background p-4 text-center text-sm text-secondary"
                    >
                      <Icons.alert className="mx-auto mb-3" />
                      <p className="mb-1">
                        <span className="font-semibold text-primary">Click to upload</span>&nbsp;
                        <span>or drag and drop</span>
                      </p>
                      <p>SVG, PNG, JPG or GIF (max. 800x800px)</p>
                    </label>
                  )}
                  {isUploading && (
                    <div className="w-full cursor-pointer rounded-xl border bg-background p-4 text-center text-sm text-secondary">
                      <Icons.upload className="mx-auto mb-3" />
                      <p className="mb-2">Uploading File Please Wait...</p>
                      <div>
                        <Progress value={uploadProgress} />{' '}
                        <span className="ml-2 font-semibold text-primary">{uploadProgress}%</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default FormImageUpload;
