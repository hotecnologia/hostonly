import { createHeroMotion } from './hero-motion-renderer.js';
const animation = await createHeroMotion(document.querySelector('.hero-scene'), () => {});
const button = document.createElement('button');
button.textContent = 'Renderizar animação';
button.style.cssText = 'position:fixed;top:10px;left:50%;z-index:100;padding:15px;background:white;color:black';
document.body.append(button);
button.addEventListener('click', async () => {
  try {
    button.disabled = true;
    const canvas = document.querySelector('.hero-canvas');
    const config = {codec:'avc1.42001f',width:canvas.width,height:canvas.height,framerate:30,bitrate:1500000,avc:{format:'annexb'},latencyMode:'quality'};
    const support = await VideoEncoder.isConfigSupported(config);
    if(!support.supported) throw new Error('H264 indisponível neste navegador');
    const chunks=[];
    const encoder = new VideoEncoder({ output(chunk) { const data=new Uint8Array(chunk.byteLength);chunk.copyTo(data);chunks.push(data); }, error(error) { button.textContent=error.message; } });
    encoder.configure(config);
    for(let index=0;index<258;index++) {
      animation.renderAt(index/30);
      const frame = new VideoFrame(canvas,{timestamp:Math.round(index*1000000/30),duration:Math.round(1000000/30)});
      encoder.encode(frame,{keyFrame:index===0});
      frame.close();
      if(encoder.encodeQueueSize>4) await new Promise(resolve=>encoder.addEventListener('dequeue',resolve,{once:true}));
      button.textContent='Renderizando '+index+'/258';
    }
    await encoder.flush();
    encoder.close();
    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob(chunks,{type:'video/h264'}));
    link.download = 'hero-motion-original.h264';
    link.textContent = 'Baixar sequência H264';
    document.body.append(link);
    button.textContent = 'Renderização concluída';
  } catch(error) {button.textContent=error.message;}
}, {once:true});
