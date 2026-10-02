<?php

namespace App\Http\Controllers;

use App\Http\Resources\OperationResource;
use App\Models\Operation;
use Illuminate\Http\Request;

class OperationController extends Controller {
    public function index(Request $request) {
        $operations = $request->user()->operations()->latest()->get();
        return OperationResource::collection($operations);
    }

    public function store(Request $request) {
        $data = $request->validate([
            'directive_name' => 'required|string|max:150',
            'details' => 'nullable|string',
            'domain_type' => 'required|in:Military,Smuggling,Psyop,Marketing,Trading',
            'execution_date' => 'nullable|date',
        ]);

        $operation = $request->user()->operations()->create($data);

        return (new OperationResource($operation))->response()->setStatusCode(201);
    }

    public function show(Request $request, Operation $operation) {
        abort_unless($operation->user()->is($request->user()), 403);
        return new OperationResource($operation->load('user'));
    }

    public function update(Request $request, Operation $operation) {
        abort_unless($operation->user()->is($request->user()), 403);

        $data = $request->validate([
            'directive_name' => 'sometimes|required|string|max:150',
            'details' => 'nullable|string',
            'domain_type' => 'sometimes|required|in:Military,Smuggling,Psyop,Marketing,Trading',
            'is_active' => 'boolean',
            'execution_date' => 'nullable|date',
        ]);

        $operation->update($data);
        return new OperationResource($operation);
    }

    public function destroy(Request $request, Operation $operation) {
        abort_unless($operation->user()->is($request->user()), 403);
        $operation->delete();
        return response()->noContent();
    }
}
