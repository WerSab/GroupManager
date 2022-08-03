Tournament -> [TicketType]

TicketType:
name: string
slots: number;
slotsTaken: number;
'prices: Map<string, number> przyklad: {"ulgowy" => 80, "normalny" => 100}'

Tickets:
name: string przyklad: "Na płycie", "Sektor A"
ticketType: ticketTypeReference
amount: number
type: string przyklad: "ulgowy"

Orders:
user: userRef
tournament: tournamentRef
tickets: [Array of ticket references]
status: string
createdAt



transakcje:
start
cos robimy na transakcji (create, update, delete)
commit transakcji
