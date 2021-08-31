<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;

    protected $guards = [];

    /**
     * Get all of the Bids for the Item
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function bids(): HasMany
    {
        return $this->hasMany(Bid::class);
    }
}
