<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Ticket;
use App\Enums\TicketStatus;
use Illuminate\Http\Request;

class SupportController extends Controller
{
    public function index()
    {
        return redirect()->route('home', ['open_chat' => 'true']);
    }

    public function show($id)
    {
        $ticket = Ticket::findOrFail($id);
        $ticket->load('messages');
        return inertia('Client/Support/Show', [
            'ticket' => $ticket,
        ]);
    }

    public function create()
    {
        return redirect()->route('home', ['open_chat' => 'true']);
    }

    public function store(Request $request)
    {
        $request->validate([
            'subject' => 'required',
            'message' => 'required',
        ]);
        
        $ticket = Ticket::create([
            'subject' => $request->subject,
            'user_id' => auth()->user()->id,
        ]);
        $ticket->messages()->create([
            'message' => $request->message,
            'is_admin' => false,
        ]);
        return redirect()->route('client.support.index');
    }

    public function reply($id, Request $request)
    {
        $ticket = Ticket::findOrFail($id);
        $ticket->messages()->create([
            'message' => $request->message,
            'is_admin' => false,
        ]);
        return redirect()->back();
    }

    public function getActiveChat()
    {
        $ticket = Ticket::where('user_id', auth()->id())
            ->where('status', '!=', 'closed')
            ->latest()
            ->first();

        if ($ticket) {
            $ticket->load(['messages' => function ($query) {
                $query->orderBy('created_at', 'asc');
            }]);
        }

        return response()->json($ticket);
    }

    public function startChat(Request $request)
    {
        $request->validate([
            'message' => 'required|string',
        ]);

        $ticket = Ticket::create([
            'subject' => 'Chat Bantuan - ' . auth()->user()->name,
            'user_id' => auth()->id(),
            'status' => TicketStatus::NEW,
        ]);

        $message = $ticket->messages()->create([
            'message' => $request->message,
            'is_admin' => false,
        ]);

        return response()->json($ticket->load(['messages' => function ($query) {
            $query->orderBy('created_at', 'asc');
        }]));
    }

    public function replyJson($id, Request $request)
    {
        $request->validate([
            'message' => 'required|string',
        ]);

        $ticket = Ticket::findOrFail($id);

        if ($ticket->status === TicketStatus::CLOSED) {
            $ticket->update(['status' => TicketStatus::NEW]);
        }

        $message = $ticket->messages()->create([
            'message' => $request->message,
            'is_admin' => false,
        ]);

        return response()->json($message);
    }
}
