<script>
    import {Button} from "$lib/components/ui/button/index.js";
    import {Game} from "./game.js";


    let game = new Game();
    let cells = game.board;
    let score = game.score;


    function move(move){
        console.log("called")
        if (game.makeMove(move) === 1) {
            cells = game.board;
            score = game.score;
        }
        else{
            console.log("Invalid move");
        }
    }

</script>

<h1> Score: {score}</h1>
<div class="flex justify-center items-center">
    <div class="grid grid-cols-4 grid-rows-4 gap-4 justify-center h-80 w-80 bg-accent rounded-xl p-4">
        {#each cells as cell, i}
            <div class="flex border border-primary rounded aspect-square h-auto w-auto justify-center" id={i}>
                <div class="content-center font-bold">
                    {cell===0?'':cell}
                </div>
            </div>
        {/each}
    </div>
</div>

<Button on:click={ () => move('up') }>Up</Button>
<Button on:click={ () => move('down') }>down</Button>
<Button on:click={ () => move('left') }>left</Button>
<Button on:click={ () => move('right') }>right</Button>
