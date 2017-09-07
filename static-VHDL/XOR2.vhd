library ieee;
use ieee.std_logic_1164.all;

entity XOR2 is
	port(x1, x2, x3: in STD_LOGIC;
		  y: out STD_LOGIC);
end entity;

architecture XOR2 of XOR2 is
begin
	y <= x1 xor x2;
end architecture;