<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $posts = $request->user()->posts()->get();
        return Inertia::render('Posts/Index', [
            'posts' => PostResource::collection($posts)
        ]);
    }

    public function create()
    {
        return Inertia::render('Posts/Create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required',
            'content' => 'required',
             'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $data['slug'] = str($data['title'])->slug();

        if ($request->hasFile('image'))
        {
            $data['image'] = Storage::disk('public')->put('posts', $request->file('image'));
//            $image = $request->file('image');
//            $name = time().'.'.$image->getClientOriginalExtension();
//            $destinationPath = public_path('/images');
//            $image->move($destinationPath, $name);
//            $data['image'] = $name;
        }
        $request->user()->posts()->create($data);
        return to_route('posts.index')->with('success', 'Post Created Successfully!');
    }

    public function edit(Post $post)
    {
        return Inertia::render('Posts/Edit', [
            'post' => new PostResource($post)
        ]);
    }

    public function update(Request $request, Post $post)
    {
        $data = $request->validate([
            'title' => 'required',
            'content' => 'required',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $data['slug'] = str($data['title'])->slug();
        $data['image'] = $post->image;

        if ($request->hasFile('image'))
        {
            Storage::disk('public')->delete($post->image);
            $data['image'] = Storage::disk('public')->put('posts', $request->file('image'));
//            $image = $request->file('image');
//            $name = time().'.'.$image->getClientOriginalExtension();
//            $destinationPath = public_path('/images');
//            $image->move($destinationPath, $name);
//            $data['image'] = $name;
        }
        $post->update($data);
        return to_route('posts.index')->with('success', 'Post Updated Successfully!');

    }

    public function destroy(Post $post)
    {
        Storage::disk('public')->delete($post->image);
        $post->delete();
        return to_route('posts.index')->with('success', 'Post Deleted Successfully!');
    }

}
