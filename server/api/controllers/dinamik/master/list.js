const items = [
    {
        firstName: 'Карен',
        lastName: '',
        photo:  '/img/avatar.png',
        profession: 'Ремонт компьютеров - продажа',
        phone: '+7 (928) 127-90-99',
        avito: 'https://www.avito.ru/user/d8e2f2e6dc1598f2da239057b8bee880/profile?src=sharing',
        id: 1
    },
    {
        firstName: 'Светлана',
        lastName: 'Гайсинская',
        photo:  '/img/avatar.png',
        profession: 'Системы очистки воды',
        phone: '+7 (928) 163-21-12',
        id: 2
    },
    {
        firstName: 'Сергей',
        lastName: 'Петров',
        photo:  '/img/avatar.png',
        profession: 'Сварщик',
        phone: '+7 (999) 999-99-99',
        id: 3
    },

]
console.log('ssssssssssssssssss',req.user)
res.json({rows:items,total:3,user:req.user})