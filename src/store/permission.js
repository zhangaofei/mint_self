import store from "../store/index";
import tool from '../utils/stringTools';
import {hasPermission} from '../utils/permissionUtil';

const permission = {
    state: {
        permissionRoutes: []
    },
    init(data) {
        const roles = data.roles;
        const router = data.router;
        if (store.getters.name != 'admin' && (tool.isNull(data) || tool.isNull(data.roles) || tool.isNull(data.router))) {
            console.log('tool.isNull(data) || tool.isNull(data.roles) || tool.isNull(data.router)')
            this.permissionRoutes = []
            return
        }
        console.log(data.roles)

        const permissionRoutes = router.filter(v => {
            if (store.getters.name.indexOf('admin') >= 0) {
                return true;
            }

            if (v.hasOwnProperty('title') && v.title) {
                return true
            }

            if (hasPermission(roles, v)) {
                if (v.children && v.children.length > 0) {
                    v.children = v.children.filter(child => {
                        if (hasPermission(roles, child)) {
                            return child
                        }
                        return false;
                    });
                    return v
                } else {
                    return v
                }
            }
            return false;
        });
        this.permissionRoutes = permissionRoutes;
    },
    get() {
        return this.permissionRoutes
    }
};

export default permission;
