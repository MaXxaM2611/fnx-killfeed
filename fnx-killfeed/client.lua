
exports("addKill",function (data)
    local vic = data.victim
    local kill = data.killer
    local death = ""
    if data.weapon ~= nil and  data.weapon == "suicide" then 
        death = "suicide"
        vic = nil
    else
        if Config.Weapon[data.weapon] then 
            death = Config.Weapon[data.weapon] 
        end
    end

    SendNUIMessage({
        type = "killfeed",
        killer = kill,
        victim = vic,
        weapon = string.lower(death)
    })
end)

RegisterNetEvent("fnx-killfeed:addKill")
AddEventHandler("fnx-killfeed:addKill",function (data)
    exports["fnx-killfeed"]:addKill(data)
end)


