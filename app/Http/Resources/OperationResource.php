<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OperationResource extends JsonResource {
    public function toArray(Request $request): array {
        return [
            'id' => $this->id,
            'directive_name' => $this->directive_name,
            'details' => $this->details,
            'domain_type' => $this->domain_type,
            'is_active' => (bool) $this->is_active,
            'execution_date' => $this->execution_date,
            'owner' => new UserResource($this->whenLoaded('user')),
            'created_at' => $this->created_at->toDateTimeString(),
        ];
    }
}
