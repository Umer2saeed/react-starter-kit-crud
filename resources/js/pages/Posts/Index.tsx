import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { toast } from "sonner";
import { useEffect } from 'react';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Posts',
        href: '/posts',
    },
];

interface Post {
    id: number;
    title: string;
    content: string;
    image: string;
    created_at: string;
}

interface Flash {
    success?: string;
    danger?: string;
}
export default function PostIndex({ posts }: { posts: Post[] }) {

    const { flash } = usePage<{flash: Flash}>().props;

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }
    }, [flash.success]);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Posts" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex justify-end">
                    <Link href={route('posts.create')} className="px-3 py-1 bg-neutral-600 hover:bg-neutral-700 text-white rounded-sm text-sm">Create Post</Link>
                </div>

                <div className="p-4 border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <Table>
                        <TableCaption>A list of your recent posts.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Image</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Content</TableHead>
                                <TableHead>Created At</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            { posts.map((post) => (
                                <TableRow>
                                    <TableCell className="font-medium">{post.id}</TableCell>
                                    <TableCell>
                                        <img src={ post.image } alt={post.title} className="h-10 w-10 rounded-full object-cover"/>
                                    </TableCell>
                                    <TableCell>{post.title}</TableCell>
                                    <TableCell>{post.content}</TableCell>
                                    <TableCell>{post.created_at}</TableCell>
                                    <TableCell className="text-right">
                                        <Link href={ route('posts.edit', post.id) } className="text-indigo-500 underline">Edit</Link>
                                        <Link href={ route('posts.destroy', post.id) } method='delete' className="ml-1 text-red-600 underline">Delete</Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                </div>
            </div>
        </AppLayout>
    );
}
