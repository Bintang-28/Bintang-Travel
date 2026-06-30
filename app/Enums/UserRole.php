<?php

namespace App\Enums;

enum UserRole: string
{
    case SUPER_ADMIN = 'super_admin';
    case ADMIN = 'admin';
    case KEPALA_TRAVEL = 'kepala_travel';
    case OWNER = 'owner';
    case CLIENT = 'client';
}
