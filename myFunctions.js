$(function(){
  const STORAGE_KEY = 'ai_apps';

  function getApps(){
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  }

  function saveApps(apps){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(apps));
  }

  function addApp(app){
    const apps = getApps();
    apps.push(app);
    saveApps(apps);
  }

  function renderApps(){
    const tbody = $('#appsTable tbody');
    if(!tbody.length) return;
    tbody.empty();

  
    const defaultApps = [
      {
        appName: 'ChatGPT',
        company: 'OpenAI',
        domain: 'الذكاء الاصطناعي / دردشة',
        free: 'نعم',
        url: 'https://chat.openai.com',
        desc: 'مساعد ذكي للدردشة والكتابة وتوليد المحتوى.'
      },
      {
        appName: 'Grammarly',
        company: 'Grammarly Inc.',
        domain: 'التدقيق اللغوي / الكتابة',
        free: 'جزئي',
        url: 'https://www.grammarly.com',
        desc: 'أداة لتحسين الكتابة وتدقيق النصوص باللغة الإنجليزية.'
      }
    ];

    function appendRow(a){
      const tr = $(`
        <tr>
          <td>${a.appName}</td>
          <td>${a.company}</td>
          <td>${a.domain}</td>
          <td>${a.free}</td>
          <td><button class='btn small toggle'>عرض</button></td>
        </tr>
      `);

      const details = $(`
        <tr class='details' style='display:none;'>
          <td colspan='5'>
            <b>الموقع:</b> <a href='${a.url}' target='_blank'>${a.url}</a><br>
            <b>الوصف:</b> ${a.desc}
          </td>
        </tr>
      `);

      tr.find('.toggle').on('click',()=>details.toggle());
      tbody.append(tr).append(details);
    }

    defaultApps.forEach(appendRow);

       getApps().forEach(appendRow);
  }

  if($('#appsTable').length) renderApps();

  if($('#appForm').length){
    $('#appForm').on('submit',function(e){
      e.preventDefault();
      const app={
        appName:$('#appName').val().trim(),
        company:$('#company').val().trim(),
        url:$('#url').val().trim(),
        free:$('input[name=free]:checked').val(),
        domain:$('#domain').val(),
        desc:$('#desc').val().trim()
      };
      if(!/^[A-Za-z]+$/.test(app.appName)){alert('اسم التطبيق يجب أن يكون أحرف إنجليزية فقط');return;}
      if(!/^[A-Za-z ]+$/.test(app.company)){alert('اسم الشركة يجب أن يكون أحرف إنجليزية فقط');return;}
      if(!app.domain){alert('اختر مجال الاستخدام');return;}
      addApp(app);
      window.location.href='apps.html';
    });
  }
});
