import InputError from '@/components/input-error';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import { Textarea } from "@/components/ui/textarea"

import React, { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Posts Create',
        href: '/posts/create',
    },
];

type PostForm = {
    title: string;
    content: string;
    image: File | null;
};
export default function PostCreate() {
    const [imagePreview, setImagePreview] = React.useState<string | null>(null);
    const { data, setData, post, processing, errors } = useForm<PostForm>({
        title: '',
        content: '',
        image: null,
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('image', file);
            setImagePreview(URL.createObjectURL(file));
        }
    }

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('posts.store'));
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Post Create" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="p-4 border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <form className="flex flex-col gap-6" onSubmit={submit}>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Title</Label>
                                <Input
                                    id="title"
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="Enter Title"
                                />
                                <InputError message={errors.title} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="image">Image</Label>
                                <Input
                                    id="image"
                                    type="file"
                                    onChange={handleFileChange}
                                />
                                {imagePreview && <img src={imagePreview} alt="Image Preview" className="h-20 w-20 rounded-md object-cover" />}
                                <InputError message={errors.image} />
                            </div>


                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="content">Content</Label>
                                </div>
                                <Textarea
                                    id="content"
                                    value={data.content}
                                    onChange={(e) => setData('content', e.target.value)}
                                    placeholder="Enter Content"
                                />
                                <InputError message={errors.content} />
                            </div>

                            <div className="flex">
                                <Button type="submit" className="mt-4 w-fit" tabIndex={4} disabled={processing}>
                                    {processing && <LoaderCircle className="animate-spin h-4 w-4" />}
                                    Create
                                </Button>

                                <Link href={ route('posts.index') } className="ml-3 mt-4 px-3 py-2 text-sm bg-neutral-950 hover:bg-neutral-800 text-white rounded-md">Cancel</Link>
                            </div>

                        </div>


                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
