<?php

use App\Role;
use Illuminate\Database\Seeder;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $author = Role::create([

            'name' => 'Author',
            'slug' => 'author',
            'permissions' => json_encode([
                'create_post' => true,
            ])
        ]);

        $editor = Role::create([

            'name' => 'Editor',
            'slug' => 'editor',
            'permissions' => json_encode([
                'update_post' => true,
                'create_post' => true,
                'publish_post' => true,
            ])
        ]);
    }
}
