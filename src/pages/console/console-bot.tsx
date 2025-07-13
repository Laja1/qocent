import { Textfield } from '@/components/shared'
import { CardContent, CardHeader, CardTitle, } from '@/components/ui/card'
import { SendHorizonal } from 'lucide-react'
export const ConsoleBot = () => {
  return (
    <div>
      <div className={'!py-3 gap-2 border !bg-transparent rounded-sm '}>
                        <CardHeader className={'!px-3 '}>
                            <CardTitle className={'text-custom-white'}>Home</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 !px-3">
                          <Textfield suffixIcon={<SendHorizonal className='text-green-800'/>} placeholder='Ask QCS'/>
                        </CardContent>
                        
                    </div>
    </div>
  )
}
