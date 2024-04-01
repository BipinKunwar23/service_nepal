<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompanyFaqs extends Model
{
    use HasFactory;
    protected $table='company_faqs';
    protected $fillable=['question','answer'];
}
