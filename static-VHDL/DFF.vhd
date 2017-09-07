library ieee;
use ieee.std_logic_1164.all;

entity DFFt is
	port(D, CLK, Res: in STD_LOGIC;
		  Q: out STD_LOGIC);
end entity;

architecture DFFt of DFFt is
begin
	process(CLK, Res)
	begin
		if(Res='1') then Q<='0';
		elsif(CLK'event and CLK='1') then 
			Q<=D;
		end if;
	end process;
end architecture;