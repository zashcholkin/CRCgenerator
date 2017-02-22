module.exports = function getVHDLCode (extentsArr) {

    var mostExtent = extentsArr.pop();

    //amount of extents without x0 and most extent
    if(extentsArr[0]==0){
        var extent0Exist = true;
        extentsArr.shift();
    }
    else{
        var extent0Exist = false;
    }

    var mediumExtentsAmount = extentsArr.length;
    //var mediumExtentsAmount = extentsArr[0]=='0' ? extentsArr.length-1 : extentsArr.length;

    var linksAmount = mostExtent + mediumExtentsAmount;

    var VHDLtemplate =
        `
library ieee;
use ieee.std_logic_1164.all;

entity CRC is
port(Din, CLK, Res: in STD_LOGIC;
Result: out STD_LOGIC_VECTOR(${mostExtent-1} downto 0));
end entity;


architecture CRC of CRC is
signal backLink: STD_LOGIC;
signal link: STD_LOGIC_VECTOR(${linksAmount-1} downto 0);

component DFFt
port(D, CLK, Res: in STD_LOGIC;
Q: out STD_LOGIC);
end component;

component XOR2
port(x1, x2: in STD_LOGIC;
y: out STD_LOGIC);
end component;

begin
    ${VHDLBodyGenerator(mostExtent, mediumExtentsAmount, extent0Exist, extentsArr)}
end architecture;
`;

    return VHDLtemplate;
}

function VHDLBodyGenerator(mostExtent, mediumExtentsAmount, extent0Exist, extentsArr) {
    var VHDLBody = "";
    var firstPortLink = (extent0Exist == true) ? "backLink": "'0'";
    var linkNumber = 0;
    var ffOutLinksArr = [];

    VHDLBody = VHDLBody + `	D0: DFFt port map(${firstPortLink}, CLK, Res, link(0));\n`;
    ffOutLinksArr.push(0);
    if (extentsArr.includes(1)) {
        VHDLBody = VHDLBody + `	X0: XOR2 port map(link(${linkNumber}), backLink, link(${++linkNumber}));\n`
    }

    for (var i = 1; i < mostExtent; i++) {
        VHDLBody = VHDLBody + `	D${i}: DFFt port map(link(${linkNumber}), CLK, Res, link(${++linkNumber}));\n`
        ffOutLinksArr.push(linkNumber);
        if (extentsArr.includes(i+1)) {
            VHDLBody = VHDLBody + `	X${i}: XOR2 port map(link(${linkNumber}), backLink, link(${++linkNumber}));\n`
        }
    }

    VHDLBody = VHDLBody + `	Xmain: XOR2 port map(link(${linkNumber++}), Din, backLink);\n\n`;

    for (var i = 0; i < ffOutLinksArr.length; i++) {
        VHDLBody = VHDLBody + ` Result(${i}) <= link(${ffOutLinksArr[i]});\n`
    }

    return VHDLBody;
}
