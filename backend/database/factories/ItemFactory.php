<?php

namespace Database\Factories;

use App\Models\Item;
use Illuminate\Database\Eloquent\Factories\Factory;

class ItemFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Item::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        
        return [
            'name' => $this->faker->name(),
            'imgurl' => $this->faker->image('public/storage/images',640,480,"transport",false),
            'bid_price' => $this->faker->numberBetween(15,200),
            'description' => $this->faker->paragraph,
            'closing_date' => date("Y-m-d H:i:s", strtotime('+'.rand(30,40).' hours')),
        ];
    }
}
