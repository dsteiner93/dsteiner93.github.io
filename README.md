TODO
====================
-Bug fix everything (Game not letting you rotate out of bounds, blocks disappearing properly, blocks falling after blocks beneath them disappear.)

-Need to not just remove the 4+ contiguous blocks, but remake the groups every time blocks disappear so the combo system can be implemented

-The game should not speed up so fast

-Add a preview of the next two blocks

-Add score features

-Make it look prettier

-Refactor this mess of spaghetti code

====================
CURRENT STATUSES

David: Four+ blocks now disappear, but I need to make it so that when the blocks fall after the blocks beneath them disappear it will re-update the size of all the groups and delete if there's another match

Adam: The blocks will now visibily rotate. I need to update basically every other method to account for proper collision detection. 




