<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Ticket;
use App\Enums\TicketStatus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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
            'message' => 'required_without:attachment|string|nullable',
            'attachment' => 'nullable|image|max:2048',
        ]);

        $attachmentPath = null;
        if ($request->hasFile('attachment')) {
            $attachmentPath = $request->file('attachment')->store('chat_attachments', 'public');
        }

        $ticket = Ticket::create([
            'subject' => 'Chat Bantuan - ' . auth()->user()->name,
            'user_id' => auth()->id(),
            'status' => TicketStatus::NEW,
        ]);

        $message = $ticket->messages()->create([
            'message' => $request->message ?? '',
            'attachment_path' => $attachmentPath,
            'is_admin' => false,
        ]);

        return response()->json($ticket->load(['messages' => function ($query) {
            $query->orderBy('created_at', 'asc');
        }]));
    }

    public function replyJson($id, Request $request)
    {
        $request->validate([
            'message' => 'required_without:attachment|string|nullable',
            'attachment' => 'nullable|image|max:2048',
        ]);

        $attachmentPath = null;
        if ($request->hasFile('attachment')) {
            $attachmentPath = $request->file('attachment')->store('chat_attachments', 'public');
        }

        $ticket = Ticket::findOrFail($id);

        if ($ticket->status !== TicketStatus::NEW) {
            $ticket->update(['status' => TicketStatus::NEW]);
        }

        $message = $ticket->messages()->create([
            'message' => $request->message ?? '',
            'attachment_path' => $attachmentPath,
            'is_admin' => false,
        ]);

        return response()->json($message);
    }
}
