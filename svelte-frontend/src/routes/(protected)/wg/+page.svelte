<script>
    import {Button} from "$lib/components/ui/button/index.js";
</script>

<h1 class="text-4xl font-bold text-center text-gradient bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-500 to-purple-600">
    Welcome to <span class="text-red-500">/WG</span>!
</h1>

<h1 class="text-3xl font-bold text-center mt-4">
    🧹 WG-Putzplan: "todo: Motto hier"
</h1>

<div class="mt-6 mx-auto max-w-4xl p-4 bg-muted rounded-lg shadow-md">
    <table class="w-full border-collapse text-sm">
        <thead class="bg-primary text-primary-foreground">
        <tr>
            <th class="p-2 text-left">Wochentag</th>
            <th class="p-2 text-left">Aufgabe</th>
            <th class="p-2 text-left">Verantwortlich</th>
            <th class="p-2 text-left">Status</th>
        </tr>
        </thead>
        <tbody>
        <tr class="border-b">
            <td class="p-2">Montag</td>
            <td class="p-2">Küche</td>
            <td class="p-2">Luca</td>
            <td class="p-2">
                <Button variant="outline" class="text-green-600">
                    ✅ Erledigt
                </Button>
            </td>
        </tr>
        <tr class="border-b">
            <td class="p-2">Dienstag</td>
            <td class="p-2">Bad</td>
            <td class="p-2">Simon</td>
            <td class="p-2">
                <Button variant="outline" class="text-yellow-600">
                    🕒 Offen
                </Button>
            </td>
        </tr>
        </tbody>
    </table>
</div>