import src.remote.restart as rt
import src.remote.stop as st
import src.remote.process as pr
import src.remote.program as pg
import src.router.infomation as i
import src.remote.sending as sd
import src.router.program as pd2

def test():
    # print(rt.restart_vm_by_id(2,"401"))
    path = i.get_pathvm_by_id_and_room(2,"401")
    # print(path)
    # pr.exce_list_process_in_1vm(path)
    sd.send_file_to_vm(path,1)
    
test()