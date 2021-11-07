function ticTacToe() {

    let cross = "<image src='X.png'>";
    let circle = "<image src='O.png'>";

    let xCoords;
    let oCoords;
    let winner;
    let currentPlayer;
    const winCons = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    function setup() {

        function resetState() {
            xCoords = [];
            oCoords = [];
            winner = 0;
            currentPlayer = 1;
        }

        function drawBoard() {

            function makeRow(rownum) {
                let blankRow = $("<tr></tr>");
                for( let i = 0; i < 3; i++ ) {
                    let td = $("<td></td>");
                    td.attr( "row", rownum );
                    td.attr( "col", i);
                    blankRow.append(td);
                }
                return blankRow;
            }
        
            for( let rownum = 0; rownum < 3; rownum++ ) {
                let row = makeRow( rownum );
                $(".gameboard").append(row);
            }
        }

        resetState();
        drawBoard();

        $( "#clear" ).addClass("btn btn-primary").on("click", () => {
            resetState();
            $( ".gameboard td" ).empty();
            $( "#turn" ).empty().append( "<p>X's Turn</p>" );
            $( "#winner" ).empty().removeClass("alert alert-primary alert-success");
        });
        
    }

    function compareWinCons(winCons, boardState ) {
        let i, j, current;

            for( i = 0; i < winCons.length; i++ ){
                if(boardState.length >= winCons[i].length){
                    current = winCons[i];
                    for( j = 0; j < 3 && boardState.includes(current[j]); j++){
                        if(j === 2){
                            return 1;
                        }
                    }
             }
            }
            return -1;
    }

    function isDraw() {
        if(xCoords.length === 5 || oCoords.lenth === 5){
            return true;
        }
        return false;
    }

    setup();

    $( ".gameboard td" ).on("click", (e) => {
        if (winner === 0) {
            let td;

            td = $( e.target );
            while( !td.is( "td" ) ) {
                td = td.parent();
            }

            let r = Number.parseInt( td.attr( "row" ) );
            let c = Number.parseInt( td.attr( "col" ) );

            if (xCoords.indexOf(r * 3 + c) < 0 && oCoords.indexOf(r * 3 + c) < 0) {
                if(currentPlayer === 1){
                    xCoords.push( r * 3 + c);
                    td.empty().append(cross);
                    console.log(xCoords);
                    currentPlayer--;
                    $( "#turn" ).empty().append("<p>O's Turn</p>");
                    if(compareWinCons(winCons, xCoords) >= 0 ) {
                        $( "#turn" ).empty();
                        $( "#winner" ).empty().addClass( "alert alert-success").append( "X's Won This Game!");
                        winner = 1;
                    }else if( isDraw() === true ) {
                        $( "#turn" ).empty();
                        $( "#winner" ).empty().addClass( "alert alert-success").append( "This Game is a Draw!");
                        winner = 3;
                    }
                }
                else{
                    oCoords.push( r * 3 + c);
                    td.empty().append(circle);
                    console.log(oCoords);
                    currentPlayer++;
                    $( "#turn" ).empty().append("<p>X's Turn</p>");
                    if(compareWinCons(winCons, oCoords) >= 0 ) {
                        $( "#turn" ).empty();
                        $( "#winner" ).empty().addClass( "alert alert-success").append( "O's Won This Game!");
                        winner = 2;
                    }else if( isDraw() === true ) {
                        $( "#turn" ).empty();
                        $( "#winner" ).empty().addClass( "alert alert-success").append( "This Game is a Draw!");
                        winner = 3;
                    }
                }

            }
        }
    });

}

$( () => ticTacToe() );