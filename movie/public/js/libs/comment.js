$('.comment').click(function (e) {
      let target=$(this);
      let toId =target.data('toid')  // 发表人的ID
      let  cId = target.data('cid')  //评论的ID

      if($('#toId').length>0){
          $('#toId').val(toId);
          $('#cId').val(cId);
      }else {
          let input2=$('<input>').attr({
              type:'hidden',
              id:'cId',
              name:'cId',
              value:cId
          })
          let input1=$('<input>').attr({
              type:'hidden',
              id:'toId',
              name:'toId',
              value:toId
          })

          $('#commentForm').append(input1);
          $('#commentForm').append(input2);
      }

})