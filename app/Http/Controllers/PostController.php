<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::all();
        return Inertia::render('Posts/Index', [
            'posts' => $posts
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

        return to_route('posts.index');




    }

    public function edit(Post $post)
    {
        return Inertia::render('Posts/Edit', [
            'post' => $post
        ]);
    }

    public function update(Request $request, Post $post)
    {
        $request->validate([
            'title' => 'required',
            'content' => 'required'
        ]);
    }

    public function destroy(Post $post)
    {

    }

}
